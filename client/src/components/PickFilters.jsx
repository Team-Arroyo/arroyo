/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  EuiButton, EuiSpacer, EuiTitle, EuiText, EuiForm, EuiFormRow, EuiFlexGroup, EuiFlexItem,
} from '@elastic/eui';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import FilterSearchValue from './FilterSearchValue';
import FilterSelectKey from './FilterSelectKey';
import { formatDate } from '../libs/utils';
import apiClient from '../libs/apiclient';

function PickFilters({ setChoices }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const isValidDateRange = (!formatDate(startDate) && !formatDate(endDate))
  || (startDate !== null && endDate !== null && startDate <= endDate);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClick = () => {
    apiClient
      .getKeys(formatDate(startDate), formatDate(endDate))
      .then(
        (keys) => setChoices(keys),
      )
      .catch((e) => console.log(e));
  };

  const getErrorMessage = () => {
    if (!formatDate(startDate) || !formatDate(endDate)) return ['Enter start and end date'];
    if (!isValidDateRange) return ['Start date cannot be greater than end date'];
    return ['Error'];
  };

  return (
    <div>
      <EuiTitle size="s"><h2>Filter</h2></EuiTitle>
      <EuiSpacer size="m" />
      <EuiText><p>Select a Date Range</p></EuiText>
      <EuiSpacer size="s" />
      <EuiForm>
        <EuiFormRow
          isInvalid={!isValidDateRange}
          error={getErrorMessage()}
        >
          <EuiFlexGroup>
            <EuiFlexItem>
              <DatePicker
                dateType="start date"
                dateStatus={startDate}
                handleChange={handleStartDateChange}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <DatePicker
                dateType="end date"
                dateStatus={endDate}
                handleChange={handleEndDateChange}
              />
            </EuiFlexItem>
          </EuiFlexGroup>

        </EuiFormRow>
        <EuiSpacer size="xl" />
        <EuiText><p>Enter search query</p></EuiText>
        <EuiSpacer size="s" />
        <EuiFormRow>
          <EuiFlexGroup>
            <EuiFlexItem>
              <FilterSelectKey />
            </EuiFlexItem>
            <EuiFlexItem>
              <FilterSearchValue />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFormRow>
        <EuiSpacer size="l" />

        <EuiFormRow>
          <EuiButton
            onClick={handleClick}
            isDisabled={!isValidDateRange}
          >
            Search S3
          </EuiButton>
        </EuiFormRow>
      </EuiForm>
    </div>
  );
}

PickFilters.defaultProps = {
  setChoices: () => console.log('the real function wasn not passed down'),
};

PickFilters.propTypes = {
  setChoices: PropTypes.func,
};

export default PickFilters;
