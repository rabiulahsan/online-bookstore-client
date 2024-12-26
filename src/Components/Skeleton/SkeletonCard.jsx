/* eslint-disable react/prop-types */
//for skeleton style
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = ({ number }) => {
  const skeletonElements = [];
  for (let i = 0; i < number; i++) {
    skeletonElements.push(
      <div key={i}>
        <div className="my-7">
          <Skeleton height={300}></Skeleton>
        </div>
        <div className="">
          <Skeleton count={3} style={{ marginBottom: "12px" }}></Skeleton>
        </div>
      </div>
    );
  }

  return <>{skeletonElements}</>;
};

export default SkeletonCard;
