export const formatHostel = (hostel: string | undefined) => {
    if(!hostel) return null
  return hostel
    .split('-')
    .map((word) => word.toUpperCase())
    .join('_');
};