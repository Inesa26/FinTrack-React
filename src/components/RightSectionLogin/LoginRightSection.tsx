import Message from "../Message.tsx";
import "./LoginRightSection.css";
import signinImg from "../../assets/signin.png";
import Image from "../Image/Image.tsx";

export default function LoginRightSection() {
  return (
    <div className="login-right-section">
      <Message
        text="Welcome back!"
        color="#0061af"
        size="60px"
        margin="10px"
        children={undefined}
      ></Message>
      <Message
        text="Manage your finances effortlessly."
        color="white"
        size="25px"
        margin="10px"
        children={undefined}
      ></Message>
      <Message
        text="Sign in to keep track of your spending and savings all in one place."
        color="white"
        size="25px"
        margin="10px"
        children={undefined}
      ></Message>
      <Image src={signinImg} alt="Login image" width={600} />
    </div>
  );
}
