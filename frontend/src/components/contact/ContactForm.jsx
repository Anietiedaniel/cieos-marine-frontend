import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessCategory: "",
    companyName: "",
    reason: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    alert("Submitted successfully!");
    setIsSubmitting(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl text-white max-w-xl mx-auto w-full"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium opacity-90">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Emmanuel"
            className="bg-[#e2e8dd] text-gray-800 placeholder-gray-500 text-sm p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#88a96b]"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium opacity-90">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder="John"
            className="bg-[#e2e8dd] text-gray-800 placeholder-gray-500 text-sm p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#88a96b]"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium opacity-90">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="08065019224"
            className="bg-[#e2e8dd] text-gray-800 placeholder-gray-500 text-sm p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#88a96b]"
          />
        </div>

        {/* Business Category */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium opacity-90">Business Category</label>
          <input
            type="text"
            name="businessCategory"
            value={formData.businessCategory}
            onChange={handleChange}
            placeholder="Select Category"
            className="bg-[#e2e8dd] text-gray-800 placeholder-gray-500 text-sm p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#88a96b]"
          />
        </div>

        {/* Company Name */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium opacity-90">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Cieos Global"
            className="bg-[#e2e8dd] text-gray-800 placeholder-gray-500 text-sm p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#88a96b]"
          />
        </div>

        {/* Reason */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium opacity-90">Reason</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Select Category"
            className="bg-[#e2e8dd] text-gray-800 placeholder-gray-500 text-sm p-3 rounded-lg outline-none w-full focus:ring-2 focus:ring-[#88a96b]"
          />
        </div>

        {/* Message */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium opacity-90">Message</label>
          <textarea
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Select Category"
            className="bg-[#e2e8dd] text-gray-800 placeholder-gray-500 text-sm p-3 rounded-lg outline-none w-full resize-none focus:ring-2 focus:ring-[#88a96b]"
          />
        </div>
      </div>

      {/* Footer Submission Controls */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-gray-300 leading-tight max-w-xs text-left">
          By submitting this form you accept our Privacy policy and sign up for our newsletter. you can unsubscribe anytime.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#7fa361] hover:bg-[#6e9151] text-white text-sm font-semibold px-8 py-2.5 rounded-lg transition-all shadow-md shrink-0 self-end sm:self-auto"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;