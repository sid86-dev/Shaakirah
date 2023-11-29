import { NextPage } from "next";

interface Props {
  session: any;
}

const Public: NextPage<Props> = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <h1 className="text-3xl">This is public content</h1>
    </div>
  );
};

export default Public;
