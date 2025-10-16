import tryCatch from "@/utils/try-catch";

const sendOtp = async (email: string) => {
  const { data: response, error } = await tryCatch(
    fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
  );

  if (error) {
    return;
  }

  const data = await response.json();
  return data;
};

export default sendOtp;
