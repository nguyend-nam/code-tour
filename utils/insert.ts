export const insertByIndex = (
  array: { value: string; animated: boolean }[],
  inserts: { index: number; value: { value: string; animated: boolean } }[]
) => {
  inserts.sort((a, b) => b.index - a.index);

  let resultArray: { value: string; animated: boolean }[] = [...array];

  for (const replacement of inserts) {
    const { index, value } = replacement;

    // Split the array at the specified index and insert the replacement value
    resultArray = [
      ...resultArray.slice(0, index),
      value,
      ...resultArray.slice(index),
    ];
  }

  return resultArray;
};
