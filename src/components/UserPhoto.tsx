import { Avatar, IAvatarProps } from "native-base";

export function UserPhoto({ ...rest }: IAvatarProps) {
  return <Avatar borderWidth={3} borderColor="blue.100" {...rest} />;
}
