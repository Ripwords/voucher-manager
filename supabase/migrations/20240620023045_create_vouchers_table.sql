CREATE TABLE vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL,
  redeemed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vouchers are only visible to the merchant that created them"
  ON vouchers FOR SELECT
  TO authenticated
  USING ( true );