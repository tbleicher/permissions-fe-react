import React from "react";

const fetchData = async (query) => {
  return await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
    }),
  }).then((res) => res.json());
};

export const QueryWrapper = ({ render, query }) => {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const { data } = await fetchData(query);

      setData(data);
    })();
  }, [query]);

  return render(data);
};
