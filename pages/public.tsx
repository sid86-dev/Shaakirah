import { NextPage } from "next";

interface Props {
  session: any;
}

const Public: NextPage<Props> = () => {
  return <div>public</div>;
};

export default Public;
