import TabButton from "../../TabButton/TabButton";
import "./CoreHelp.css";

interface CoreHelpProps {
  title: string;
  description: string;
  image: string;
  onSelect: (description: string) => void;
  activeButton: string | null;
  onClick: (title: string) => void;
}

export default function CoreHelp(props: CoreHelpProps) {
  return (
    <li className="core-help">
      <img
        style={{ marginLeft: "30px", marginBottom: "20px" }}
        src={props.image}
        alt={props.title}
      />
      <TabButton
        onSelect={() => props.onSelect(props.description)}
        onClick={() => props.onClick(props.title)}
        active={props.title === props.activeButton}
      >
        {props.title}
      </TabButton>
    </li>
  );
}
