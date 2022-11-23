const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("calc-app", () => {
  const provider = anchor.AnchorProvider.local();

  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.CalcApp;
  it("Create a calculator", async () => {
    const greetingMsg = "My initial msg";
    await program.rpc.create(greetingMsg, {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting === greetingMsg);
  });
});
