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
  it("addition work", async () => {
    const num1 = 3;
    const num2 = 4;
    await program.rpc.add(new anchor.BN(num1), new anchor.BN(num2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(num1 + num2)));
  });

  it("subtraction work", async () => {
    const num1 = 5;
    const num2 = 4;
    await program.rpc.sub(new anchor.BN(num1), new anchor.BN(num2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(num1 - num2)));
  });

  it("multiplication work", async () => {
    const num1 = 5;
    const num2 = 4;
    await program.rpc.mult(new anchor.BN(num1), new anchor.BN(num2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(num1 * num2)));
  });

  it("division work", async () => {
    const num1 = 8;
    const num2 = 4;
    await program.rpc.div(new anchor.BN(num1), new anchor.BN(num2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(num1 / num2)));
  });
});
