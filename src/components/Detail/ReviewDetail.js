import React from "react";

const ReviewDetail = () => {
  return (
    <div className="mt-3">
      <h2 className="text-gray-100">Reviewed</h2>
      <form action="">
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter your review..."
          className="px-5 py-1 rounded-md border-0 w-full text-[#ccc] border-b border-[#007BFF] bg-transparent mt-2"
          autoComplete="off"
        />
      </form>
      <div className="mt-6">
        <div className="mt-3">
          <h3 className="text-gray-100 text-md underline">Author is here</h3>
          <p className="text-sm text-[#ccc]">8days ago</p>
          <p className="text-[#ccc] text-sm py-2">
            I was scared to buy these for a while because I'm tall for my age
            and its always been something i was self conscious about. BUT! while
            these do make me a good bit taller they feel SO POWERFUL, i dont
            know how to explain it but i feel amazing wearing them. I use a
            rowing machine, cycle bike and just wear them out and tie perfect
            for everything!!!
          </p>
        </div>

        <div className="mt-3">
          <h3 className="text-gray-100 text-md underline">Author is here</h3>
          <p className="text-sm text-[#ccc]">8days ago</p>
          <p className="text-[#ccc] text-sm py-2">
            I was scared to buy these for a while because I'm tall for my age
            and its always been something i was self conscious about. BUT! while
            these do make me a good bit taller they feel SO POWERFUL, i dont
            know how to explain it but i feel amazing wearing them. I use a
            rowing machine, cycle bike and just wear them out and tie perfect
            for everything!!!
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReviewDetail;
