import dashboardImg from "../../assets/images/Dashboard 1.png";
import workorderImg from "../../assets/images/work order (to do view) 1.png";
import equipmentImg from "../../assets/images/Body 1.png";

const modules = [
  {
    id: "Module 01",
    title: "Dashboard",
    description:
      "Centralized operational overview of fleet performance and vessel activity.",
    points: [
      "Real-time operational visibility across the fleet",
      "Built-in workflows, approvals, and audit trails",
      "Native integrations with onboard and shore systems",
    ],
    image: dashboardImg,
  },
  {
    id: "Module 02",
    title: "Work Order",
    description:
      "Create, assign, monitor, and complete vessel maintenance work orders efficiently.",
    points: [
      "Real-time operational visibility across the fleet",
      "Built-in workflows, approvals, and audit trails",
      "Native integrations with onboard and shore systems",
    ],
    image: workorderImg,
  },
  {
    id: "Module 03",
    title: "Equipment",
    description:
      "Track vessel equipment, operational status, servicing history, and lifecycle.",
    points: [
      "Real-time operational visibility across the fleet",
      "Built-in workflows, approvals, and audit trails",
      "Native integrations with onboard and shore systems",
    ],
    image: equipmentImg,
  },
];

const suiteModules = [
  {
    title: "Maintenance Plan · PM",
    description:
      "Manage preventive maintenance schedules and planned servicing operations.",
  },
  {
    title: "Inspections",
    description:
      "Perform structured vessel inspections with digital reporting workflows.",
  },
  {
    title: "Defects",
    description:
      "Track vessel defects, issue severity, repairs, and operational risks.",
  },
  {
    title: "Inventory",
    description:
      "Manage vessel inventory, spare parts, procurement tracking, and stock availability.",
  },
  {
    title: "Documents",
    description:
      "Store and organize operational, compliance, and vessel documentation securely.",
  },
  {
    title: "Condition Monitoring",
    description:
      "Monitor vessel health, equipment performance, and operational anomalies in real time.",
  },
  {
    title: "Teams",
    description:
      "Manage crew teams, responsibilities, assignments, and collaboration.",
  },
  {
    title: "Team Hub",
    description:
      "Central communication and operational coordination workspace.",
  },
  {
    title: "Reports",
    description:
      "Generate operational analytics, maintenance reports, inspection summaries, and fleet insights.",
  },
  {
    title: "Settings",
    description:
      "Administrative controls, permissions, and system configuration.",
  },
];

const Features = () => {
  return (
    <section className="bg-[#f8f8f5] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="uppercase tracking-wider text-[#6d8a4f] font-semibold">
            The Platform
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            One Platform.
            <span className="text-[#88a96b]">
              {" "}
              Every Maritime Workflow.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Thirteen integrated modules built for the operational rigor of
            modern fleets.
          </p>
        </div>

        {/* Main Modules */}
        <div className="space-y-32">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={`grid lg:grid-cols-2 gap-14 items-center ${
                index % 2 !== 0
                  ? "lg:[&>*:first-child]:order-2"
                  : ""
              }`}
            >
              {/* Text Content */}
              <div>
                <span className="inline-block px-4 py-2 rounded-xl bg-[#eef5e7] border border-[#d6e3c7] text-sm font-medium text-gray-700">
                  {module.id}
                </span>

                <h3 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
                  {module.title}
                </h3>

                <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                  {module.description}
                </p>

                <ul className="mt-8 space-y-4">
                  {module.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="w-3 h-3 rounded-full bg-[#88a96b] mt-2 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-[#d6e3c7] shadow-lg bg-white">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Module Suite */}
        <div className="mt-36">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Complete Module Suite
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suiteModules.map((module) => (
              <div
                key={module.title}
                className="bg-[#f4f7ef] border border-[#dbe6cd] rounded-2xl p-6 hover:shadow-lg transition duration-300 hover:-translate-y-1"
              >
                <h4 className="text-xl font-semibold text-[#6d8a4f] mb-3">
                  {module.title}
                </h4>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;