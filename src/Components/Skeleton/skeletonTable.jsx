/* eslint-disable react/prop-types */
//for skeleton style
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTable = ({ number }) => {
  const skeletonElements = [];
  for (let i = 0; i < number; i++) {
    skeletonElements.push(
      <div key={i} className="">
        <Skeleton
          count={1}
          height={70}
          style={{ marginBottom: "20px" }}
        ></Skeleton>
      </div>
    );
  }

  return <>{skeletonElements}</>;
};

export default SkeletonTable;
