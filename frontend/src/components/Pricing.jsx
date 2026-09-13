import "../styles/component/Pricing.css";
import Container from "./Container";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      duration: "/Forever",
      button: "Get Started",
      features: [
        "1 Resume",
        "2 ATS Templates",
        "PDF Download",
        "Basic Customization",
      ],
    },
    {
      name: "Pro",
      price: "₹199",
      duration: "/month",
      button: "Start Pro",
      popular: true,
      features: [
        "Unlimited Resumes",
        "20+ Premium Templates",
        "ATS Score Checker",
        "Cover Letter Builder",
        "No Watermark",
      ],
    },
    {
      name: "Lifetime",
      price: "₹999",
      duration: "/Once",
      button: "Buy Lifetime",
      features: [
        "Everything in Pro",
        "Future Templates Free",
        "Priority Support",
        "Lifetime Updates",
      ],
    },
  ];

  return (
    <section className="pricing-section py-5" id="pricing">
      <Container>
        <div className="">
          <div className="text-center mb-5">
            <span className="badge bg-primary mb-2">Pricing</span>
            <h2 className="fw-bold">Choose Your Resume Plan</h2>
            <p className="text-muted">
              Create ATS-friendly resumes with professional templates.
            </p>
          </div>

          <div className="row g-4">
            {plans.map((plan, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className={`price-card ${plan.popular ? "popular" : ""}`}>
                  {plan.popular && (
                    <div className="popular-tag">Most Popular</div>
                  )}

                  <h4>{plan.name}</h4>

                  <div className="price">
                    {plan.price}
                    <span>{plan.duration}</span>
                  </div>

                  <ul>
                    {plan.features.map((item, i) => (
                      <li key={i}>✓ {item}</li>
                    ))}
                  </ul>

                  <button
                    className={`btn ${
                      plan.popular ? "btn-primary" : "btn-outline-dark"
                    } w-100`}
                    onClick={() =>
                      alert("Currently, this feature is not available.")
                    }
                  >
                    {plan.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
