import signupImg from "../../../assets/signup.png";
import Image from "../../Image/Image.tsx";
import Message from "../../Message.tsx";
import "./SignUpLeftSection.css";

export default function SignUpLeftSection() {
  return (
    <div className="signup-left-section">
      <Message
        text="Join Fintrack Today!"
        color="#0061af"
        size="60px"
        margin="10px"
        children={undefined}
      ></Message>
      <Message
        text="Take control of your financial future."
        color="white"
        size="25px"
        margin="10px"
        children={undefined}
      ></Message>
      <Message
        text="Sign up now to start tracking your finances with ease and precision."
        color="white"
        size="25px"
        margin="10px"
        children={undefined}
      ></Message>
      <Image src={signupImg} alt="Login image" width={600} />
    </div>
  );
}
