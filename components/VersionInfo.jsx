import React from 'react';
import packageInfo from '../package.json';


const VersionInfo = () => {
  return <div>Version: {packageInfo.version}</div>;
};

export default VersionInfo;

