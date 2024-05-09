import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const useRouteQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (list, arbitaryPathname = pathname) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(list).forEach((dataArr) => {
      dataArr[1]
        ? current.set(dataArr[0], dataArr[1])
        : current.delete(dataArr[0]);
    });
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${arbitaryPathname}${query}`);
  };
};
