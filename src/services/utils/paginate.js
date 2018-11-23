import _ from 'lodash';

const paginate = (items, pageNumber, itemsPerPage) => {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  return _(items)
    .slice(startIndex)
    .take(itemsPerPage)
    .value();
};

export default paginate;
