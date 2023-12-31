import { UserBannerIncluded } from "@/services/data-access/banner";
import { useDictionaryStore } from "@/store/dictionary-store";

import UserBanner from "./user-banner";
import UserBannersEmpty from "./user-banners-empty";
import UserBannersSkeleton from "./user-banners-skeleton";

type Props = {
  loading: boolean;
  userBanners: UserBannerIncluded[];
  handleBannerSelect: (userBanner: UserBannerIncluded) => void;
};

const UserBannersTabContent = ({
  loading,
  userBanners,
  handleBannerSelect,
}: Props) => {
  const dictionary = useDictionaryStore((state) => state.dictionary);

  return (
    <div className="grid-xl-3 items-end">
      {loading ? (
        <UserBannersSkeleton />
      ) : userBanners.length ? (
        userBanners.map((ub) => (
          <UserBanner
            key={ub.bannerId}
            userBanner={ub}
            handleBannerSelect={() => handleBannerSelect(ub)}
          />
        ))
      ) : (
        <UserBannersEmpty label={dictionary.dashboard["user.banners.empty"]} />
      )}
    </div>
  );
};

export default UserBannersTabContent;
