import os
import pg8000
import ssl
import json
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
        
        print("Adding new premium columns to roasts table...")
        columns = [
            ("tam_value", "TEXT"),
            ("sam_value", "TEXT"),
            ("som_value", "TEXT"),
            ("gtm_strategy", "JSONB")
        ]
        
        for col_name, col_type in columns:
            try:
                cur.execute(f"ALTER TABLE roasts ADD COLUMN {col_name} {col_type}")
                conn.commit()
                print(f"Added column {col_name}")
            except Exception as e:
                conn.rollback()
                if "already exists" in str(e).lower():
                    print(f"Column {col_name} already exists")
                else:
                    print(f"Error adding column {col_name}: {e}")
        
        print("Migration complete!")
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
