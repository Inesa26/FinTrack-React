import { useState } from "react";

function useColorChangingButton(
  initialColor: string,
  afterClickColor: string
): [string, () => void] {
  const [color, setColor] = useState<string>(initialColor);

  const handleClick = () => {
    setColor(afterClickColor);
  };

  return [color, handleClick];
}

export default useColorChangingButton;
