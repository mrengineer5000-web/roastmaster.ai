import os
import pg8000
import ssl
from urllib.parse import unquote, urlparse
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / "backend" / ".env")

DATABASE_URL = os.environ.get("SUPABASE_DB_URL") or os.environ.get("DATABASE_URL")

def migrate():
    if not DATABASE_URL:
        print("No DATABASE_URL found")
        return

    parsed = urlparse(DATABASE_URL)
    conn = pg8000.dbapi.connect(
        user=unquote(parsed.username or ""),
        password=unquote(parsed.password or ""),
        host=parsed.hostname,
        port=parsed.port or 5432,
        database=(parsed.path or "/postgres").lstrip("/"),
        ssl_context=ssl._create_unverified_context(),
    )
    
    try:
        cur = conn.cursor()
        
        print("Adding columns to roasts table...")
        # Add columns if they don't exist
        columns = [
            ("is_premium", "BOOLEAN DEFAULT FALSE"),
            ("competitors", "JSONB"),
            ("tam_analysis", "TEXT"),
            ("india_rating", "INTEGER"),
            ("global_rating", "INTEGER")
        ]
        
        for col_name, col_type in columns:
            try:
                cur.execute(f"ALTER TABLE roasts ADD COLUMN {col_name} {col_type}")
                print(f"Added column {col_name}")
            except Exception as e:
                if "already exists" in str(e).lower():
                    print(f"Column {col_name} already exists")
                else:
                    print(f"Error adding column {col_name}: {e}")
        
        print("Updating payments table...")
        try:
            cur.execute("ALTER TABLE payments ADD COLUMN roast_id TEXT REFERENCES roasts(id) ON DELETE SET NULL")
            print("Added roast_id to payments")
        except Exception as e:
            if "already exists" in str(e).lower():
                print("Column roast_id already exists in payments")
            else:
                print(f"Error adding roast_id to payments: {e}")

        try:
            cur.execute("ALTER TABLE payments ADD COLUMN payment_type TEXT DEFAULT 'roast_credit'")
            print("Added payment_type to payments")
        except Exception as e:
            if "already exists" in str(e).lower():
                print("Column payment_type already exists in payments")
            else:
                print(f"Error adding payment_type to payments: {e}")
                
        conn.commit()
        print("Migration complete!")
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
