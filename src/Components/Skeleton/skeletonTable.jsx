//for skeleton style
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const skeletonTable = ({ number }) => {
  const skeletonElements = [];
  for (let i = 0; i < number; i++) {
    skeletonElements.push(
      <div key={i}>
        <Skeleton count={1} style={{ marginBottom: "12px" }}></Skeleton>
      </div>
    );
  }

  return <>{skeletonElements}</>;
};

export default skeletonTable;
