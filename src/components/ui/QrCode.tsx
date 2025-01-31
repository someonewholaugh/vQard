import { useRef, useState, useCallback } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui';
import { Copy, CopyCheck } from '@/components/icons';
import { generateRandomString } from '@/utils';
import { QrCodeProps } from '@/types';

const QR_CONFIG = {
  size: 148,
  bgColor: '#ffffff',
  fgColor: '#000000',
  marginSize: 3,
  level: 'L' as const,
};

export const QrCode = ({ value }: QrCodeProps) => {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (error) {
      console.error('Failed to copy value:', error);
    }
  }, [value]);

  const handleDownload = useCallback(() => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;

    const pngFile = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngFile;
    downloadLink.download = `qrcode-${generateRandomString(16)}.png`;
    downloadLink.click();
  }, []);

  if (!value) {
    return (
      <div className="bg-black-secondary/20 backdrop-blur-lg rounded-xl h-fit py-4 grid place-items-center border border-white/20">
        <p className="text-center text-red-500">Unable to generate QR Code.</p>
      </div>
    );
  }

  return (
    <div className="bg-black-secondary/20 backdrop-blur-lg rounded-xl h-fit p-10 space-y-6 grid place-items-center border border-white/20">
      <div className="overflow-hidden rounded-lg">
        <QRCodeSVG value={value} {...QR_CONFIG} />
      </div>
      <div className="hidden">
        <QRCodeCanvas ref={qrCanvasRef} value={value} {...QR_CONFIG} />
      </div>
      <div className="space-y-4 w-full">
        <div className="w-full border border-white/20 justify-between rounded-lg py-2.5 px-5 flex items-center">
          <p className="text-sm truncate max-w-[80%]">{value}</p>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={isCopied ? 'Copied to clipboard' : 'Copy to clipboard'}
          >
            {isCopied ? <CopyCheck /> : <Copy />}
          </button>
        </div>
        <Button className="w-full" onClick={handleDownload}>
          Download QR Code
        </Button>
      </div>
    </div>
  );
};
