"use client";
import React from "react";

import { trpc } from "@/utils/trpc";

function Test() {
  const { data } = trpc.user.hello.useQuery({ name: "name" });

  return <div className="text-red-500">{data?.greeting}</div>;
}

export default Test;
