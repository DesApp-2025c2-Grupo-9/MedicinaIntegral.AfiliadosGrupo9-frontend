import React from "react";
import NavButton from "./NavButton";

function TwoNavButtons({
  firstIcon,
  firstDescription,
  secondIcon,
  secondDescription,
  active,
}) {
  return (
    <div className="flex gap-2">
      <NavButton
        icon={firstIcon}
        description={firstDescription}
        active={true}
      />
      <NavButton
        icon={secondIcon}
        description={secondDescription}
        active={false}
      />
    </div>
  );
}

export default TwoNavButtons;
