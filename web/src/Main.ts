const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'studentAddress',
        type: 'address',
      },
    ],
    name: 'addStudentToProjectWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'verifierAddress',
        type: 'address',
      },
    ],
    name: 'addVerifierToProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'deadlineTimestamp',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isPublic',
        type: 'bool',
      },
    ],
    name: 'createProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMyProjects',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'deadlineTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'isPublic',
            type: 'bool',
          },
        ],
        internalType: 'struct Project[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
    ],
    name: 'getProject',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'title',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'deadlineTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'isPublic',
            type: 'bool',
          },
        ],
        internalType: 'struct Project',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
    ],
    name: 'postAchievement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
    ],
    name: 'registerSelfStudent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'achievementId',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'verifiedStatus',
        type: 'bool',
      },
    ],
    name: 'setVerified',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export default abi;
