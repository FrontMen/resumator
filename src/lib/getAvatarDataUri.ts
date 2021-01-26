import avatars from "../assets/images/avatars";

export default function getAvatarDataUri(name: string) {
  const { img } = avatars.find((avatar) => avatar.name === name) || avatars[0]; // Fall back to first avatar folder
  return img;
}
