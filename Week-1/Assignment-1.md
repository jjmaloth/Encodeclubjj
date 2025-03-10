## Deployed Code

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    string private text;
    address public owner;

    modifier onlyOwner()
    {
        require (msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() {
        text = "Hello World";
        owner = msg.sender;
    }

    function helloWorld() public view returns (string memory) {
        return text;
    }

    function setText(string calldata newText) public onlyOwner {
        text = newText;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
```  
---

### Svart Galla - HSWW8s  
---  
- **Contract Deployment:**  
https://sepolia.etherscan.io/tx/0x2cba8addb0eb65ed3b165144636f64be87352bddae4e1cef8ae211489a2f7b61  
- ***Set Text* Method Call** - *Successful* **:**  
https://sepolia.etherscan.io/tx/0x6ed7f8bb3a535f532b690a6dd914954a8a532c125bb4cb6bbd8501d428050a4c  
- ***Transfer Ownership* Method Call** - *Successful* **:**
https://sepolia.etherscan.io/tx/0x073984ca8ee756abe5b3ab8787c460fe06efcd8efbd05b514a1ec12ca505b429  
- ***Set Text* Method Call** - *Failed* **:**  
https://sepolia.etherscan.io/tx/0xf13ac72f9a7f79b1e30574a9479b6ab2e7725a56db6bedb19a17258c33974baf  
Fail with error 'Caller is not the owner', execution reverted  
- ***Transfer Ownership* Method Call** - *Failed* **:**  
https://sepolia.etherscan.io/tx/0xe4c576d0f2ae86a727f75c0e1bdd3aef646ec882f437cc40077b06b5351ad4d5  
Fail with error 'Caller is not the owner', execution reverted  

### CryptoWin - GMm8Id  
---  
- **Contract Deployment:**  
https://sepolia.etherscan.io/tx/0x50d5c76bc42e03ba7f770372b494bf356834f12dcd73daa024fc967dd0c791ec  
- ***Set Text* Method Call** - *Successful* **:**  
https://sepolia.etherscan.io/tx/0xbc28796c6c3e338db05d6b9d35290c7254fb131ac6864e21b3faaaacb9e18593  
- ***Transfer Ownership* Method Call** - *Successful* **:**  
https://sepolia.etherscan.io/tx/0xa685bf3a50134b8834e0d81204ff2b1fb53065ee01b21250f78e48d3115d223c  
- ***Set Text* Method Call** - *Failed* **:**  
https://sepolia.etherscan.io/tx/0x5429353c848710476cc3bbbb2a08d18d218544c88264d568b9dc85f05c71270f  
Fail with error 'Caller is not the owner', execution reverted  
- ***Transfer Ownership* Method Call** - *Failed* **:**  
https://sepolia.etherscan.io/tx/0x0f03a40a92618d5320c7443552646c49de6dd3a94e063bc2dfb0f6c4f2ed18e2  
Fail with error 'Caller is not the owner', execution reverted  
- ***Transfer Ownership* Method Call** - *Successful* **:**  
https://sepolia.etherscan.io/tx/0xa736109ca116b2e00ef045abc5ff4ce5858f42f67b7d8748ae59c0e061a9a123  

### Taufik - JH2nHs  
---  
- **Contract Deployment:**  
https://sepolia.etherscan.io/tx/0xaece716d157f0ae678da3f6a1f6a4549d2edd949b031276b99b9f3daa1491d74  
- ***Set Text* Method Call** - *Successful* **:**  
https://sepolia.etherscan.io/tx/0x9c0fcd1d425c5dec7b97f37913ee004be1bee2118331b137a0eccf16c96d3fc4  
- ***Transfer Ownership* Method Call** - *Successful* **:**
https://sepolia.etherscan.io/tx/0xd44430535870cce964558d3756bb363896e6bbaec2b6f5e8eabb2d0e2b307631  
