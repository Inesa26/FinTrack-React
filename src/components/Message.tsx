interface MessageProps {
  text: string;
  color: string;
  size: string;
  margin: string;
  children: React.ReactNode;
}

export default function Message({
  text,
  color,
  size,
  margin,
  children,
}: MessageProps) {
  const messageStyle = {
    color: color,
    fontSize: size,
    margin: margin,
  };
  return (
    <p className="message" style={messageStyle}>
      {text}
      {children}
    </p>
  );
}
