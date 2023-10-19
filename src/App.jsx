import "./App.css";
import { SismoConnectButton, AuthType } from "@sismo-core/sismo-connect-react";

export const AUTHS = [{ authType: AuthType.VAULT }];
export const CLAIMS = [
    // part of the group Blocktheory
    { groupId: "0x0f800ff28a426924cbe66b67b9f837e2" },
    // age group is higher
    {
        // Sismo Factory Users
        groupId: "0x05629c9a54e30d8c8aea911a48cd9e30",
        isOptional: true,
    },
];

function App() {
    const config = {
        appId: "0x786e741648e610f335dcda57ee15bcf4",
    };

    return (
        <>
            <div>
                <SismoConnectButton
                    // the client config created
                    config={config}
                    // request a proof of account ownership
                    // (here Vault ownership)
                    auth={AUTHS}
                    // request a proof of group membership
                    // (here the group with id 0x42c768bb8ae79e4c5c05d3b51a4ec74a)
                    claim={CLAIMS}
                    // request a message signature
                    signature={{ message: "Your message" }}
                    //  a response containing his proofs
                    onResponse={async (response) => {
                        console.log({ response });
                        //Send the response to your server to verify it
                        //thanks to the @sismo-core/sismo-connect-server package
                    }}
                    onResponseBytes={async (bytes) => {
                        console.log({ bytes });
                        //Send the response to your contract to verify it
                        //thanks to the @sismo-core/sismo-connect-solidity package
                    }}
                />
            </div>
        </>
    );
}

export default App;
