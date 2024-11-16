import { memo } from "react";
import Countdown, { CountdownRenderProps, zeroPad } from "react-countdown";

type CustomCountDownVProps = {
  otpExpiryTime?: string;
  expiredHandler: (uniqid: string) => void;
};

const CustomCountDownV = ({
  otpExpiryTime,
  expiredHandler,
}: CustomCountDownVProps) => {
  const renderer = (props: CountdownRenderProps) => (
    <span>
      {zeroPad(props.minutes)}:{zeroPad(props.seconds)}
    </span>
  );

  if (!otpExpiryTime) return null;

  return (
    <Countdown
      date={Date.now() + Number(otpExpiryTime) * 60 * 1000}
      renderer={(e) => renderer(e)}
      onComplete={() => expiredHandler(Date.now().toString())}
    />
  );
};

export const CustomCountDown = memo(CustomCountDownV);
