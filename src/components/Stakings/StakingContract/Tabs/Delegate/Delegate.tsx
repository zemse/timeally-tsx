import React, { Component } from 'react';
import { TimeAllyStaking } from 'eraswap-sdk/dist/typechain/ESN';
import { ethers } from 'ethers';
import { Table, Button, Alert } from 'react-bootstrap';
import { DelegationElement, Delegation } from './DelegationElement';
import { NewDelegation } from './NewDelegation';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
  // destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
};

type State = {
  currentMonth: number | null;
  delegations: Delegation[] | null;
  displayMessage: string;
};

export class Delegate extends Component<Props, State> {
  state: State = {
    currentMonth: null,
    delegations: null,
    displayMessage: '',
  };

  componentDidMount = async () => {
    this.loadDelegations();
  };

  loadDelegations = async () => {
    const currentMonth = await window.nrtManagerInstance.currentNrtMonth();

    const delegations = (
      await this.props.instance.queryFilter(this.props.instance.filters.Delegate(null, null, null))
    )
      .map((logs) => this.props.instance.interface.parseLog(logs))
      .map((parsedLogs) => {
        const delegation: Delegation = {
          month: parsedLogs.args[0],
          platform: parsedLogs.args[1],
          delegatee: parsedLogs.args[2],
        };
        return delegation;
      });

    this.setState({ delegations, currentMonth });
  };

  render() {
    return (
      <>
        {this.state.delegations === null || this.state.currentMonth === null ? (
          'Loading delegations...'
        ) : this.state.delegations.length === 0 ? (
          'No Delegations done yet'
        ) : (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th>NRT Month</th>
                  <th>Platform</th>
                  <th>Delegatee</th>
                  <th>Delegation Share</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.delegations.map((delegation, i) => (
                  <DelegationElement
                    delegation={delegation}
                    instance={this.props.instance}
                    refreshDetailsHook={this.loadDelegations}
                  />
                ))}
              </tbody>
            </Table>
          </>
        )}

        <NewDelegation
          instance={this.props.instance}
          refreshDetailsHook={async () => {
            await this.props.refreshDetailsHook();
            await this.loadDelegations();
          }}
        />
      </>
    );
  }
}
