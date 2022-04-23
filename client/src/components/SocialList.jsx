import { IconList , Div } from "../Styles/SocialList";
import { socialMedia } from "../Utils/SocialMedia";

function SocialList() {
  return (
    <Div>
      {socialMedia.map((item, index) => (
        <IconList href={item.link} key={index} target="_blank" rel="noreferrer">
          {item.icon}
        </IconList>
      ))}
    </Div>
  );
}

export default SocialList;