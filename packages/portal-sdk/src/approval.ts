import {
  acceptApproval,
  listApprovals,
  rejectApproval,
  type AcceptApprovalData,
  type ListApprovalsData,
  type ListApprovalsResponses,
  type RejectApprovalData,
} from './generated/index.js';
import { Client } from './generated/client/types.gen.js';
import { transformResponse } from './utils.js';

export class ApprovalAPI {
  constructor(private readonly client: Client) {}

  /**
   * List pending and processed approval workflow items for the current portal.
   * @param query Optional query parameters.
   * @returns The list of approvals.
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async list(
    query?: ListApprovalsData['query'],
  ): Promise<ListApprovalsResponses['200']> {
    return transformResponse(
      await listApprovals({ client: this.client, query }),
    );
  }

  /**
   * Accept an approval request and apply the corresponding portal-side change.
   * @param id The approval ID.
   * @param data Optional request body (e.g. operator metadata).
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async accept(
    id: string,
    data?: AcceptApprovalData['body'],
  ): Promise<void> {
    transformResponse(
      await acceptApproval({
        client: this.client,
        path: { approval_id: id },
        body: data,
      }),
    );
  }

  /**
   * Reject an approval request so the requested action is not applied.
   * @param id The approval ID.
   * @param data Optional request body (e.g. operator metadata).
   * @throws {APIError} If the API request fails or network error occurs.
   */
  public async reject(
    id: string,
    data?: RejectApprovalData['body'],
  ): Promise<void> {
    transformResponse(
      await rejectApproval({
        client: this.client,
        path: { approval_id: id },
        body: data,
      }),
    );
  }
}
