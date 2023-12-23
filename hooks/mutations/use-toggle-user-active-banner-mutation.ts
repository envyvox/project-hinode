import { ReactQueryKeys } from "@/lib/react-query-keys";
import { toggleUserBanner } from "@/services/data-access/banner";
import { useUserStore } from "@/store/user-store";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  userId?: string;
  bannerId: string;
  isActive: boolean;
};

export const useToggleUserActiveBannerMutation = () => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: ({ userId, bannerId, isActive }: Props) =>
      toggleUserBanner(userId ?? user.id, bannerId, isActive),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ReactQueryKeys.userActiveBanner(variables.userId ?? user.id),
      });
    },
  });
};
