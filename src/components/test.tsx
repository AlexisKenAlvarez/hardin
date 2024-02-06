'use client'

import { api } from "@/trpc/react";

const Test = () => {

  const testMutation = api.auth.posts.useMutation()
  return (
    <button onClick={() => testMutation.mutate()}>
      Click me
    </button>
  );
}

export default Test;