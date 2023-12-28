import '@pages/popup/Applications.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import Chat from '@root/src/pages/apps/Chat';
import Sftp from '@root/src/pages/apps/Sftp';


const Applications = () => {  
    return (
        <div className="App-Applications">
          <Chat />
          {/* <Sftp /> */}
        </div>
    );
}

export default withErrorBoundary(withSuspense(Applications, <div> Loading ... </div>), <div> Error Occur </div>);
