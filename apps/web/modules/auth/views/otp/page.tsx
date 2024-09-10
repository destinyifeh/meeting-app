import { Button, OtpInputField } from "@vms/ui";

const Otp = () => {
  return (
    <div className="max-w-[401px] flex flex-col justify-center items-center space-y-[1.3rem]">
      <h3 className="leading-[3.6rem] font-bold text-[2.4rem]">
        OTP Verification
      </h3>

      <p className="text-[1.4rem] leading-[1.68rem] font-normal font-lato">
        Enter OTP code sent to B*****@g***.com
      </p>
      <OtpInputField />

      <p className="text-[1.4rem] leading-[16.8px] font-normal mb-6 font-lato">
        Didn’t recieve OTP code?
      </p>

      <p className="text-[1.4rem] leading-[16.8px] font-normal block font-lato">
        <span className="text-error">Resend Code</span> in 1 minute
      </p>

      <Button
        type="submit"
        variant="secondary"
        size="large"
        className="w-full font-lato  text-[16px] leading-[19.2px]"
      >
        Verify & Proceed
      </Button>
    </div>
  );
};
export default Otp;
