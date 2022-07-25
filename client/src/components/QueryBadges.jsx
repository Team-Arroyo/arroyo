/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable no-console */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiBadge,
  EuiPanel,
  EuiBadgeGroup,
} from '@elastic/eui';
import { removeQuery } from '../features/queriesSlice';

function QueryBadges() {
  const queries = useSelector((state) => state.queries);
  const keys = Object.keys(queries);
  const dispatch = useDispatch()

  return (
    <EuiPanel color="subdued" style={{ maxWidth: 400 }}>
      <EuiBadgeGroup gutterSize="s">
        { keys.map((k) => {
          return (
            <EuiBadge
              key={k}
              iconType="cross"
              iconSide="right"
              iconOnClick={() => dispatch(removeQuery(k))}
              iconOnClickAriaLabel="Click to remove Query Term"
            >
              {`${k}:${queries[k]}`}
            </EuiBadge>
          )
        })}
      </EuiBadgeGroup>
    </EuiPanel>
  );
}

export default QueryBadges;