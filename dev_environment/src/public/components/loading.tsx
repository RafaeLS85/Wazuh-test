import React from 'react';
import {
  EuiFlexItem,
  EuiButtonEmpty,
} from '@elastic/eui';

export default function Loading() {
  return (
    <EuiFlexItem grow={false}>
      <EuiButtonEmpty size="xs" onClick={() => {}} isLoading iconSide="right">
        Loading&hellip;
      </EuiButtonEmpty>
    </EuiFlexItem>
  );
}
