import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaFileAlt } from "react-icons/fa";

import "../../styles/MyResume.css";
import api from "../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import templates from "../../data/templates";
import { useLoading } from "../../../context/LoginContext";
import Loader from "../../components/Loader";

const MyResume = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [resumes, setResumes] = useState([]);
  const [sortBy, setSortBy] = useState("recent");

  // ================= FETCH RESUMES =================

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchResumes = async () => {
      startLoading();
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/resume", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResumes(response.data.resumes || []);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        stopLoading();
      }
    };

    fetchResumes();
  }, [isAuthenticated, navigate]);

  // ================= DELETE =================

  const handleDelete = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes((prev) => prev.filter((resume) => resume._id !== resumeId));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  // ================= FILTER + SORT =================

  const filteredResumes = resumes
    .filter((resume) =>
      resume.resumeName?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.resumeName.localeCompare(b.resumeName);
      }

      if (sortBy === "name-desc") {
        return b.resumeName.localeCompare(a.resumeName);
      }

      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });

  // ================= LOADING =================

  if (loading) {
    return <Loader />;
  }

  // ================= UI =================

  return (
    <div className="my-resume-page">
      {/* ================= HEADER ================= */}

      <div className="my-resume-header">
        <div className="my-resume-heading">
          <h1>My Resumes</h1>
          <p>Manage and edit your resumes.</p>
        </div>

        <button
          className="create-resume-btn"
          onClick={() => navigate("/create-resume")}
        >
          <FaPlus />
          Create Resume
        </button>
      </div>

      {/* ================= TOOLBAR ================= */}

      <div className="resume-toolbar">
        <div className="resume-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="resume-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Recently Updated</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>

      {/* ================= RESUME GRID ================= */}

      {filteredResumes.length > 0 ? (
        <div className="resume-grid">
          {filteredResumes.map((resume) => {
            const relatedTemplate = templates.find(
              (template) => template.templateId === resume.templateId,
            );

            return (
              <div className="resume-card" key={resume._id}>
                {/* ================= TEMPLATE PREVIEW ================= */}

                <div className="resume-preview">
                  {relatedTemplate?.templateImage ? (
                    <img
                      src={relatedTemplate.templateImage}
                      alt={relatedTemplate.templateName}
                      className="template-preview-image"
                    />
                  ) : (
                    <div className="preview-placeholder">
                      <div className="preview-line large" />
                      <div className="preview-line medium" />

                      <div className="preview-section-title" />

                      <div className="preview-line" />
                      <div className="preview-line" />
                      <div className="preview-line short" />

                      <div className="preview-section-title" />

                      <div className="preview-line" />
                      <div className="preview-line" />
                      <div className="preview-line short" />
                    </div>
                  )}

                  <span className="template-badge">
                    {relatedTemplate?.templateName || resume.templateId}
                  </span>
                </div>

                {/* ================= RESUME INFORMATION ================= */}

                <div className="resume-card-body">
                  <div className="resume-info">
                    <h3>{resume.resumeName}</h3>

                    <p>
                      Updated{" "}
                      {resume.updatedAt
                        ? new Date(resume.updatedAt).toLocaleDateString()
                        : "Recently"}
                    </p>
                  </div>
                </div>

                {/* ================= ACTIONS ================= */}

                <div className="resume-card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/create-resume/${resume._id}`)}
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(resume._id)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ================= EMPTY STATE ================= */

        <div className="empty-resume">
          <div className="empty-icon">
            <FaFileAlt />
          </div>

          <h2>{search ? "No resumes found" : "No resumes yet"}</h2>

          <p>
            {search
              ? "Try searching with a different resume name."
              : "Create your first professional resume to get started."}
          </p>

          {!search && (
            <button
              className="create-resume-btn"
              onClick={() => navigate("../create-resume")}
            >
              <FaPlus />
              Create Resume
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyResume;
