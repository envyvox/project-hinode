import useUserBox from "@/hooks/use-user-box";
import useUserCrop from "@/hooks/use-user-crop";
import useUserCurrency from "@/hooks/use-user-currency";
import useUserFish from "@/hooks/use-user-fish";
import useUserGathering from "@/hooks/use-user-gathering";
import useUserProduct from "@/hooks/use-user-product";
import useUserSeed from "@/hooks/use-user-seed";

type Props = {
  children: React.ReactNode;
};

const UserItemsProvider = ({ children }: Props) => {
  useUserBox();
  useUserCrop();
  useUserCurrency();
  useUserFish();
  useUserGathering();
  useUserProduct();
  useUserSeed();

  return children;
};

export default UserItemsProvider;
