document.getElementById("validar_cartao").addEventListener("click", function () {
    const cartaoCredito = document.getElementById("cartao_credito").value;
    const dataValidade = document.getElementById("data_validade").value;
    const cvv = document.getElementById("cvv").value;

    const isValid = CreditCardValidator.isValid(cartaoCredito);

    if (isValid) {
        alert("Cartão de crédito válido!");
        // Aqui você pode adicionar a lógica para prosseguir com o pagamento.
    } else {
        alert("Cartão de crédito inválido. Por favor, verifique os dados.");
    }
});

// Importe a biblioteca qrcode-generator
import QRCode from 'qrcode-generator';

// Obtenha o elemento de imagem do QR code no HTML
const qrCodeImage = document.getElementById('pix-qr-code-image');

// Informações para o pagamento PIX (exemplo)
const chavePix = 'chavepix@exemplo.com'; // Substitua pela sua chave PIX
const valor = 100.00; // Substitua pelo valor do pagamento
const descricao = 'Pagamento de produtos';

// Crie o payload do pagamento PIX
const pixPayload = `00020126330014BR.GOV.BCB.PIX0114${chavePix}0215Exemplo Pagador52040000530398654081051234567000${valor.toFixed(2)}53030${descricao}`;

// Gere o QR code
const qr = QRCode(0, 'M');
qr.addData(pixPayload);
qr.make();

// Defina o tamanho do QR code
qr.createImgTag(6, 0).then(qrImgTag => {
    qrCodeImage.src = qrImgTag;
});
