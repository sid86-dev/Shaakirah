import Layout from "@/components/App/Layout";
import { NextPage } from "next";

interface Props {
  session: any;
}

const Public: NextPage<Props> = () => {
  return (
    <Layout type="public">
      <div className="flex w-full">
        <h1>Public Page</h1>
      </div>
    </Layout>
  );
};

export default Public;
