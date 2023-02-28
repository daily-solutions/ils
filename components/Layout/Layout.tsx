import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import { Loader } from '../../ui';

const NotConfigured = dynamic(() => import('../NotConfigured'), {
  loading: () => <Loader />,
  ssr: false,
});

interface Props {
  domain: string;
  isConfigured: boolean;
  room: string;
  token?: string;
}

export const Layout = ({ domain, isConfigured, room, token = '' }: Props) => {
  if (!isConfigured) return <NotConfigured />;

  return <div style={{ textAlign: 'center', fontSize: '100px' }}>🐸</div>;
};
