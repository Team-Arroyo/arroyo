import iamClient from '../clients/iamClient.mjs';
import { DetachRolePolicyCommand } from '@aws-sdk/client-iam';

const detachSingleRolePolicy = async ({ roleName, policyArn }) => {
    try {
      const data = await iamClient.send(new DetachRolePolicyCommand({
        PolicyArn: policyArn,
        RoleName: roleName
      }));
      console.log('Success. Policy detached. Data: ', data);
      return data;
    } catch (err) {
      console.log('Error', err);
    }
};

export default detachSingleRolePolicy;
