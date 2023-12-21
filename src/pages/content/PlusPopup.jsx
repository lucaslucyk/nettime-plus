import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const PlusPopup = () => {
  return <p>netTime+</p>;
};

export default withErrorBoundary(withSuspense(PlusPopup, <div> Loading ... </div>), <div> Error Occur </div>);
